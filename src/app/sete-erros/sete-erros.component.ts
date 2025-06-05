import { Component, type OnInit, inject, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { HttpClient, HttpClientModule } from "@angular/common/http"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface FeedbackItem {
  line: string
  status: "acertou" | "errou"
  certo?: string
  error?: string
}

interface FeedbackResponse {
  score: number
  feedback: FeedbackItem[]
}

@Component({
  selector: "app-sete-erros",
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: "./sete-erros.component.html",
  styleUrls: ["./sete-erros.component.css"],
})
export class SeteErrosComponent implements OnInit, AfterViewInit {
  @ViewChild("codeEditor", { static: false }) codeEditor!: ElementRef<HTMLTextAreaElement>

  isLoading = true
  errorMessage: string | null = null
  codeBlocks: string[][] = []
  currentCodeText = "" // Nova propriedade para o texto do editor
  feedback: FeedbackResponse | null = null
  apiUrl = "http://localhost:3000"

  private http = inject(HttpClient)

  ngOnInit(): void {
    this.loadCodeBlocks()
  }

  ngAfterViewInit(): void {
    // Configurar o editor após a view ser inicializada
    if (this.codeEditor) {
      this.setupCodeEditor()
    }
  }

  setupCodeEditor(): void {
    const textarea = this.codeEditor.nativeElement

    // Permitir tab no textarea para indentação
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault()
        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        // Inserir 2 espaços (indentação)
        textarea.value = textarea.value.substring(0, start) + "  " + textarea.value.substring(end)
        textarea.selectionStart = textarea.selectionEnd = start + 2

        // Atualizar o modelo
        this.onCodeTextChange(textarea.value)
      }
    })
  }

  loadCodeBlocks(): void {
    this.isLoading = true
    this.errorMessage = null
    this.feedback = null

    this.http.get<string[]>(`${this.apiUrl}/api/codes`).subscribe({
      next: (data) => {
        console.log("Dados recebidos da API:", data)
        // Converte o array simples em array de arrays para manter compatibilidade
        this.codeBlocks = [data]
        // Converte para texto editável
        this.currentCodeText = data.join("\n")
        this.isLoading = false

        // Configurar editor após carregar dados
        setTimeout(() => {
          if (this.codeEditor) {
            this.setupCodeEditor()
          }
        }, 0)
      },
      error: (error) => {
        console.error("Erro ao carregar códigos:", error)
        this.errorMessage = "Erro ao carregar códigos. Verifique se o servidor está rodando."
        this.isLoading = false
      },
    })
  }

  // Método original mantido para compatibilidade
  onCodeChange(index: number, event: Event): void {
    const target = event.target as HTMLElement
    if (!target.innerText) return

    const updatedCode = target.innerText.split("\n").map((line) => line.trimEnd())
    this.codeBlocks[index] = updatedCode
    console.log(`Bloco ${index} atualizado:`, this.codeBlocks[index])
  }

  // Novo método para o editor de texto
  onCodeTextChange(newText: string): void {
    this.currentCodeText = newText
    // Atualiza o codeBlocks para manter compatibilidade com a API
    const lines = newText.split("\n")
    this.codeBlocks = [lines]
    console.log("Código atualizado:", lines)
  }

  checkAnswers(): void {
    if (!this.codeBlocks.length || !this.codeBlocks[0].length) {
      this.errorMessage = "Nenhum código para verificar."
      return
    }

    console.log("Verificando respostas...")
    console.log("Bloco de código enviado:", this.codeBlocks[0])

    this.http
      .post<FeedbackResponse>(`${this.apiUrl}/api/correct`, {
        userAnswers: this.codeBlocks[0], // Envia apenas o primeiro bloco (único bloco)
      })
      .subscribe({
        next: (res) => {
          console.log("Resposta recebida:", res)
          this.feedback = res
          this.errorMessage = null
        },
        error: (error) => {
          console.error("Erro ao verificar respostas:", error)
          this.errorMessage = "Erro ao verificar as respostas. Tente novamente."
        },
      })
  }

  resetGame(): void {
    this.feedback = null
    this.errorMessage = null
    this.currentCodeText = ""
    this.loadCodeBlocks()
  }

  // Novo método para formatar o código
  formatCode(): void {
    const lines = this.currentCodeText.split("\n")
    const formattedLines = lines.map((line) => line.trim())
    this.currentCodeText = formattedLines.join("\n")

    if (this.codeEditor) {
      this.codeEditor.nativeElement.value = this.currentCodeText
    }

    this.onCodeTextChange(this.currentCodeText)
  }
}
