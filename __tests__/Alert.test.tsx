import { Alert, Text } from 'src/components'
import { render, screen } from 'test-utils'

const AlertTest = ({ openAlert }: { openAlert: boolean }) => {
  return (
    <Alert openAlert={openAlert}>
      <Text testID='children-alert'>It's showing Alert</Text>
    </Alert>
  )
}

test('show alert component', async () => {
  render(() => <AlertTest openAlert={true} />)

  const childrenAlert = await screen.findByTestId('children-alert')

  expect(childrenAlert).toHaveTextContent("It's showing Alert")

  expect(screen.toJSON()).toMatchSnapshot()
})
