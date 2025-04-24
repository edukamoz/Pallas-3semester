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
  feedback: FeedbackItem[][]
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

  // Usando a função inject para injetar o HttpClient
  private http = inject(HttpClient)

  ngOnInit(): void {
    this.loadCodeBlocks()
  }

  loadCodeBlocks(): void {
    this.isLoading = true
    this.errorMessage = null

    this.http.get<string[][]>(`${this.apiUrl}/api/codes`).subscribe({
      next: (data) => {
        console.log("Dados recebidos da API:", data)
        this.codeBlocks = data
        this.isLoading = false
      },
      error: (error) => {
        console.error("Erro ao carregar códigos:", error)
        this.errorMessage = "Erro ao carregar códigos."
        this.isLoading = false
      },
    })
  }

  onCodeChange(index: number, event: Event): void {
    const target = event.target as HTMLElement
    this.codeBlocks[index] = target.innerText.split("\n")
    console.log(`Bloco ${index} atualizado:`, this.codeBlocks[index])
  }

  checkAnswers(): void {
    console.log("Verificando respostas...")
    console.log("Blocos de código enviados:", this.codeBlocks)

    this.http
      .post<FeedbackResponse>(`${this.apiUrl}/api/correct`, {
        userAnswers: this.codeBlocks,
      })
      .subscribe({
        next: (res) => {
          console.log("Resposta recebida:", res)
          this.feedback = res
        },
        error: (error) => {
          console.error("Erro ao verificar respostas:", error)
          this.errorMessage = "Erro ao verificar as respostas."
        },
      })
  }

  resetGame(): void {
    this.feedback = null
    this.loadCodeBlocks()
  }
}
