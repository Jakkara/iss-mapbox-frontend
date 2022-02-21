import styled from 'styled-components'

export const Header1 = styled.h1``

export const FadeIn = styled.div`
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const FadeText = styled(FadeIn)`
  display: inline;
`