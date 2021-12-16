import styled from "styled-components";
import DocumentComponent from "../../components/documentation/DocumentComponent";

import Button from "../../components/generic/Button";
import DisplayTime from "../../components/generic/DisplayTime";
import Input from "../../components/generic/Input";
import Form from "../../components/generic/Form";
import Timer from "../../components/generic/Timer";
import Message from "../../components/generic/Message";
import Sequence from "../../components/generic/Sequence";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Button"
          component={<Button text="Hello" className="round-btn" />}
          propDocs={[
            {
              prop: "text",
              description: "The text, or icon, that the button will display",
              type: "string, object",
              defaultValue: "Optional. Default: None",
            },
            {
              prop: "className",
              description:
                "The css class name that should be applied to the button",
              type: "string",
              defaultValue: "Optional. Default: None",
            },
            {
              prop: "onClick",
              description: "The function that should execute on button click",
              type: "func",
              defaultValue: "Optional. Default: None",
            },
            {
              prop: "disabled",
              description: "Will disable the button if set to true",
              type: "bool",
              defaultValue: "Optional. Default: None",
            },
          ]}
        />
        <DocumentComponent
          title="Input"
          component={
            <Input placeholder="My Input" onChange={(e) => console.log(e)} />
          }
          propDocs={[
            {
              prop: "type",
              description: "The input type",
              type: "string",
              defaultValue: "Optional. Default: None",
            },
            {
              prop: "label",
              description: "The label that the input will have",
              type: "string",
              defaultValue: "Optional. Default: None",
            },
            {
              prop: "placeholder",
              description: "Any placeholder text that the input should display",
              type: "string",
              defaultValue: "Optional. Default: None",
            },
            {
              prop: "value",
              description: "The value displayed in the input",
              type: "string, number",
              defaultValue: "Optional. Default: None",
            },
            {
              prop: "onChange",
              description: "The function that should execute on input change",
              type: "func",
              defaultValue: "Required. Default: None",
            },
          ]}
        />
        <DocumentComponent
          title="Form"
          component={<Form />}
          propDocs={[
            {
              prop: "None",
              description:
                "State is managed with TimerContext and WorkoutContext",
              type: "",
              defaultValue: "",
            },
          ]}
        />
        <DocumentComponent
          title="Sequence"
          component={<Sequence />}
          propDocs={[
            {
              prop: "None",
              description:
                "State is managed with TimerContext and WorkoutContext",
              type: "",
              defaultValue: "",
            },
          ]}
        />
        <DocumentComponent
          title="DisplayTime"
          component={<DisplayTime />}
          propDocs={[
            {
              prop: "None",
              description: "State is managed with TimerContext",
              type: "",
              defaultValue: "",
            },
          ]}
        />
        <DocumentComponent
          title="Message"
          component={<Message value="This message has no delay" />}
          propDocs={[
            {
              prop: "delay",
              description:
                "How long before message disappears (in milliseconds)",
              type: "number",
              defaultValue: "Optional. Default: None",
            },
            {
              prop: "value",
              description: "The message that should be displayed",
              type: "string, func",
              defaultValue: "Optional. Default: None",
            },
          ]}
        />
        <DocumentComponent
          title="Timer"
          component={<Timer />}
          propDocs={[
            {
              prop: "config",
              description: "Sets the timer configuration",
              type: "object",
              defaultValue: "Optional. Default: None",
            },
          ]}
        />
      </div>
    </Container>
  );
};

export default Documentation;
