import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface Level {
  id: number
  instructions: string
  startingCSS: string
  solution: string
  planets: number
  layout: string
}

@Component({
  selector: "app-challange-1-css",
  templateUrl: "./challange-1-css.component.html",
  styleUrls: ["./challange-1-css.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Challenge1CssComponent implements OnInit {
  currentLevel = 1
  userCSS = ""
  isCorrect = false
  showHint = false
  totalLevels = 5

  levels: Level[] = [
    {
      id: 1,
      instructions: "Ajude a posicionar os planetas no centro do espaço usando justify-content.",
      startingCSS: "display: flex;\n/* Adicione seu código abaixo */\n\n",
      solution: "justify-content: center;",
      planets: 3,
      layout: "row",
    },
    {
      id: 2,
      instructions: "Distribua os planetas uniformemente usando justify-content.",
      startingCSS: "display: flex;\n/* Adicione seu código abaixo */\n\n",
      solution: "justify-content: space-between;",
      planets: 3,
      layout: "row",
    },
    {
      id: 3,
      instructions: "Alinhe os planetas ao final do espaço usando justify-content.",
      startingCSS: "display: flex;\n/* Adicione seu código abaixo */\n\n",
      solution: "justify-content: flex-end;",
      planets: 3,
      layout: "row",
    },
    {
      id: 4,
      instructions: "Centralize os planetas verticalmente usando align-items.",
      startingCSS: "display: flex;\nheight: 100%;\n/* Adicione seu código abaixo */\n\n",
      solution: "align-items: center;",
      planets: 3,
      layout: "row",
    },
    {
      id: 5,
      instructions: "Centralize os planetas tanto horizontalmente quanto verticalmente.",
      startingCSS: "display: flex;\nheight: 100%;\n/* Adicione seu código abaixo */\n\n",
      solution: "justify-content: center;\nalign-items: center;",
      planets: 3,
      layout: "row",
    },
  ]

  constructor() {}

  ngOnInit(): void {
    this.userCSS = this.getCurrentLevel().startingCSS
  }

  getCurrentLevel(): Level {
    return this.levels.find((level) => level.id === this.currentLevel) || this.levels[0]
  }

  checkSolution(): void {
    const level = this.getCurrentLevel()
    const userCSSNormalized = this.normalizeCSS(this.userCSS)
    const solutionNormalized = this.normalizeCSS(level.solution)

    this.isCorrect = userCSSNormalized.includes(solutionNormalized)
  }

  normalizeCSS(css: string): string {
    return css.replace(/\s+/g, " ").trim().toLowerCase()
  }

  nextLevel(): void {
    if (this.currentLevel < this.totalLevels) {
      this.currentLevel++
      this.userCSS = this.getCurrentLevel().startingCSS
      this.isCorrect = false
      this.showHint = false
    }
  }

  previousLevel(): void {
    if (this.currentLevel > 1) {
      this.currentLevel--
      this.userCSS = this.getCurrentLevel().startingCSS
      this.isCorrect = false
      this.showHint = false
    }
  }

  toggleHint(): void {
    this.showHint = !this.showHint
  }

  resetLevel(): void {
    this.userCSS = this.getCurrentLevel().startingCSS
    this.isCorrect = false
  }
}
