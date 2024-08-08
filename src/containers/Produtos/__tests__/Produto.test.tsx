import { screen, waitFor } from '@testing-library/react'
import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox Series S/X'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['PS5', 'Xbox Series S/X'],
    preco: 150,
    precoAntigo: 200,
    titulo: 'Gotham Knights'
  },
  {
    id: 4,
    categoria: 'Avebtura',
    imagem: '',
    plataformas: ['Nintendo Switch'],
    preco: 189.9,
    precoAntigo: 299.9,
    titulo: 'Donkey Kong'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o container Produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve Renderizar corretamente com Carregando...', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve Renderizar corretamente com a Listagem de Jogos', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
    })
  })
})
