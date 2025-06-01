import { type ComponentFixture, TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { SeteErrosComponent } from "./sete-erros.component"

describe("SeteErrosComponent", () => {
  let component: SeteErrosComponent
  let fixture: ComponentFixture<SeteErrosComponent>
  let httpMock: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeteErrosComponent, HttpClientTestingModule],
    }).compileComponents()

    fixture = TestBed.createComponent(SeteErrosComponent)
    component = fixture.componentInstance
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })

  it("should load code blocks on init", () => {
    const mockData = ['const nome = "Maria"', "console.log(nome);"]

    component.ngOnInit()

    const req = httpMock.expectOne("http://localhost:3000/api/codes")
    expect(req.request.method).toBe("GET")
    req.flush(mockData)

    expect(component.codeBlocks).toEqual([mockData])
    expect(component.isLoading).toBeFalse()
  })

  it("should handle error when loading code blocks", () => {
    component.ngOnInit()

    const req = httpMock.expectOne("http://localhost:3000/api/codes")
    req.error(new ErrorEvent("Network error"))

    expect(component.errorMessage).toContain("Erro ao carregar códigos")
    expect(component.isLoading).toBeFalse()
  })

  it("should update code block on change", () => {
    component.codeBlocks = [["linha1", "linha2"]]

    const mockEvent = {
      target: {
        textContent: "nova linha1\nnova linha2",
      },
    } as any

    component.onCodeChange(0, mockEvent)

    expect(component.codeBlocks[0]).toEqual(["nova linha1", "nova linha2"])
  })

  it("should check answers", () => {
    component.codeBlocks = [['const nome = "Maria"', "console.log(nome);"]]

    const mockResponse = {
      score: 5,
      feedback: [
        { line: 'const nome = "Maria"', status: "acertou" as const },
        { line: "console.log(nome);", status: "errou" as const, certo: 'console.log("Olá, Maria!");' },
      ],
    }

    component.checkAnswers()

    const req = httpMock.expectOne("http://localhost:3000/api/correct")
    expect(req.request.method).toBe("POST")
    expect(req.request.body).toEqual({
      userAnswers: ['const nome = "Maria"', "console.log(nome);"],
    })
    req.flush(mockResponse)

    expect(component.feedback).toEqual(mockResponse)
  })

  it("should reset game", () => {
    component.feedback = { score: 5, feedback: [] }
    component.errorMessage = "Algum erro"

    const mockData = ["nova linha"]

    component.resetGame()

    const req = httpMock.expectOne("http://localhost:3000/api/codes")
    req.flush(mockData)

    expect(component.feedback).toBeNull()
    expect(component.errorMessage).toBeNull()
    expect(component.codeBlocks).toEqual([mockData])
  })
})
