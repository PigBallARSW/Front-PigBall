import { Container} from "@pixi/react";
import React from "react";
import PropTypes from 'prop-types';

/**
 * Componente de jugadores y balon
 * @param {JSX.Element} props.children
 * @returns {JSX.Element} jugadores y balon
 */
export const MoveContainer = React.memo(({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
})

MoveContainer.propTypes = {
  children: PropTypes.element.isRequired
};