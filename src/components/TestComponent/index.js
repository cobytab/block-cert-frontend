import React, { useEffect } from "react";
import { connect } from "react-redux";
import { testAction } from "./../../app/actions/userActions";
import styled from 'styled-components';

const Welcome = styled.h1`
    color: red;
    background-color: yellow;
`;

const Test = ({ name, testAction }) => {
  useEffect(() => {
    testAction();
  }, [name]);

  return (
    <div>
      <Welcome>{name}</Welcome>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.user.name,
});

export default connect(mapStateToProps, { testAction })(Test);
