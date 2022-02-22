import styled from 'styled-components'

export const Overlay = styled.div<{ vertical: 'left' | 'right' }>`
  position: absolute;
  top: 16px;
  ${props => props.vertical}: 16px;
  max-width: 50%;
  background-color: rgba(31, 33, 53, 0.8);
  border: 1px solid rgba(160, 159, 184, 0.2);
  color: #fff;
  padding: 6px 9px;
  border-radius: 12px;
  height: 24px;
`

export const FadeIn = styled.div`
  transition: opacity 0 0.5s;
  animation: fadein 0.5s;
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