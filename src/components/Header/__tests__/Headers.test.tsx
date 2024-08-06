import { screen } from '@testing-library/react'

import Header from '..'
import { renderizaComProvider } from '../../../utils/tests'

describe('Tests para o componente Header', () => {
  test('Deve Renderizar corretamente', () => {
    renderizaComProvider(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })
})
