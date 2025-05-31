import { Component, type OnInit, inject } from "@angular/core"
import { HttpClient, HttpClientModule } from "@angular/common/http"
import { CommonModule } from "@angular/common"

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
  imports: [CommonModule, HttpClientModule],
  templateUrl: "./sete-erros.component.html",
  styleUrls: ["./sete-erros.component.css"],
})
export class SeteErrosComponent implements OnInit {
  isLoading = true
  errorMessage: string | null = null
  codeBlocks: string[][] = []
  feedback: FeedbackResponse | null = null
  apiUrl = "http://localhost:3000"

  private http = inject(HttpClient)

  ngOnInit(): void {
    this.loadCodeBlocks()
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
        this.isLoading = false
      },
      error: (error) => {
        console.error("Erro ao carregar códigos:", error)
        this.errorMessage = "Erro ao carregar códigos. Verifique se o servidor está rodando."
        this.isLoading = false
      },
    })
  }

  onCodeChange(index: number, event: Event): void {
    const target = event.target as HTMLElement
    if (!target.innerText) return

    const updatedCode = target.innerText.split("\n").map((line) => line.trimEnd()) // Remove apenas espaços do final da linha

    this.codeBlocks[index] = updatedCode
    console.log(`Bloco ${index} atualizado:`, this.codeBlocks[index])
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
    this.loadCodeBlocks()
  }
}
