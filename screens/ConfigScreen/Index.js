import { Container, ButtonContainer, Button, ButtonText, Title, Subtitle } from "../../components/ConfigComponents";

function ConfigScreen() {
    return ( 
        <Container>
            <Title>Configuration</Title>
            <Subtitle>Long Periods</Subtitle>
            <ButtonContainer>
                <Button style={{backgroundColor: '#1ab85e'}}>
                    <ButtonText>25 | 5</ButtonText>
                </Button>
                <Button>
                    <ButtonText>30 | 5</ButtonText>
                </Button>
                <Button>
                    <ButtonText>35 | 5</ButtonText>
                </Button>
            </ButtonContainer>

            <Subtitle>Short Periods</Subtitle>
            <ButtonContainer>
                <Button>
                    <ButtonText>15 | 3</ButtonText>
                </Button>
                <Button>
                    <ButtonText>10 | 3</ButtonText>
                </Button>
                <Button>
                    <ButtonText>5 | 2</ButtonText>
                </Button>
            </ButtonContainer>
        </Container>  // or return your component here
     );
}

export default ConfigScreen;