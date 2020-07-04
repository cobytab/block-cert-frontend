import React from 'react';
import styled from 'styled-components';
import { colors } from './shared';

const StyledFooter = styled.div`
    background-color: ${colors.tertiary};
    width: 100%;
    height: 3.5rem;
    padding-top: 1rem;
`
const StyledText = styled.p`
    text-align: center;
    color: ${colors.primary};
    margin: 0;
`

const Footer = () => {
    return (
        <StyledFooter>
            <StyledText> Powered by Block-Cert &copy;2020</StyledText>
        </StyledFooter>
    )
}

export default Footer;