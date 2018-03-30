import styled from 'styled-components'

export const ItemStyled = styled.div`
  margin: 30px 0;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border-radius: .375rem;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  -webkit-box-shadow: 2px 4px 8px 0 rgba(46,61,73,.2);
  box-shadow: 2px 4px 8px 0 rgba(46,61,73,.2);

  :hover {
    -webkit-box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
    box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
  }
`
