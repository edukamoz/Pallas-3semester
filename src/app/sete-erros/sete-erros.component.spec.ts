import { Component, type AfterViewInit, type ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"

interface FeedbackItem {
  line: string
  status: "acertou" | "errou"
  certo?: string
  error?: string
}

@Component({
  selector: "app-sete-erros",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./sete-erros.component.html",
  styleUrls: ["./sete-erros.component.css"],
})
export class SeteErrosComponent implements AfterViewInit {
[x: string]: any
resetGame: any
onCodeChange(_t17: number,$event: Event) {
throw new Error('Method not implemented.')
}


  @ViewChild("codesContainer") codesContainer!: ElementRef
  @ViewChild("result") result!: ElementRef

  codeBlocks: string[][] = []
  isLoading = true
  errorMessage: string | null = null
feedback: any

  async ngAfterViewInit() {
    try {
      // Busca os blocos com erro da API
      const response = await fetch("http://localhost:3000/api/codes")
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const blocksWithError: string[][] = await response.json()
      this.codeBlocks = blocksWithError
      this.isLoading = false

      // Renderiza blocos na tela após um pequeno delay para garantir que o DOM está pronto
      setTimeout(() => this.renderCodeBlocks(), 100)

      // Configura o evento de clique para o botão
      const checkButton = document.getElementById("check-button")
      if (checkButton) {
        checkButton.addEventListener("click", () => this.checkAnswers())
      }
    } catch (error) {
      console.error("Failed to load code blocks:", error)
      this.errorMessage = "Falha ao carregar os blocos de código. Verifique se o servidor está rodando."
      this.isLoading = false
    }
  }

  renderCodeBlocks() {
    const container = document.getElementById("codes-container")
    if (!container || !this.codeBlocks.length) {
      console.error("Container not found or no code blocks available")
      return
    }

    // Limpa o container antes de adicionar novos blocos
    container.innerHTML = ""

    // Renderiza cada bloco de código
    this.codeBlocks.forEach((block, index) => {
      const codeBlock = document.createElement("pre")
      codeBlock.contentEditable = "true"
      codeBlock.classList.add("code-block")
      codeBlock.dataset["index"] = index.toString()
      codeBlock.textContent = block.join("\n")

      // Adiciona estilos para tornar o bloco mais visível
      codeBlock.style.backgroundColor = "#1e293b"
      codeBlock.style.padding = "15px"
      codeBlock.style.borderRadius = "8px"
      codeBlock.style.marginBottom = "20px"
      codeBlock.style.color = "#f8fafc"
      codeBlock.style.fontFamily = "monospace"
      codeBlock.style.whiteSpace = "pre-wrap"
      codeBlock.style.border = "1px solid #334155"

      container.appendChild(codeBlock)

      // Log para debug
      console.log(`Rendered code block ${index}:`, block)
    })
  }

  async checkAnswers() {
    try {
      const blocks = Array.from(document.querySelectorAll(".code-block")) as HTMLElement[]
      if (!blocks.length) {
        console.error("No code blocks found")
        return
      }

      const userAnswers = blocks.map((block) =>
        (block.textContent || "")
          .trim()
          .split("\n")
          .map((l) => l.trim()),
      )

      const res = await fetch("http://localhost:3000/api/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAnswers }),
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const data = await res.json()
      const resultElement = document.getElementById("result")

      if (resultElement) {
        let feedbackHTML = `<p><strong>Sua pontuação: ${data.score}</strong></p>`
        data.feedback.forEach((blockFeedback: FeedbackItem[], index: number) => {
          feedbackHTML += `<h4>Bloco ${index + 1}</h4><ul>`
          blockFeedback.forEach((item: FeedbackItem) => {
            if (item.status === "acertou") {
              feedbackHTML += `<li style="color: lightgreen;">✔️ ${item.line}</li>`
            } else {
              feedbackHTML += `<li style="color: red;">❌ ${item.line} (Correto: ${item.certo})</li>`
            }
          })
          feedbackHTML += "</ul>"
        })
        resultElement.innerHTML = feedbackHTML
      }
    } catch (error) {
      console.error("Error checking answers:", error)
      const resultElement = document.getElementById("result")
      if (resultElement) {
        resultElement.innerHTML = '<p style="color: red;">Erro ao verificar respostas. Tente novamente.</p>'
      }
    }
  }
}
