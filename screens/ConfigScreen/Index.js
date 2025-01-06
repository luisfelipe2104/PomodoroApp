import { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Container, ButtonContainer, Button, ButtonText, Title, Subtitle } from "../../components/ConfigComponents";

function ConfigScreen({ navigation }) {
    const { defaultWorkMinutes, defaultPauseMinutes, setDefaultWorkMinutes, setDefaultPauseMinutes } = useContext(DataContext)

    const updateTimer = (workMinutes, pauseMinutes) => {
        setDefaultWorkMinutes(workMinutes)
        setDefaultPauseMinutes(pauseMinutes)
        navigation.navigate("Timer")
    }

    return ( 
        <Container>
            <Title>Configuration</Title>
            <Subtitle>Long Periods</Subtitle>
            <ButtonContainer>
                <Button onPress={() => updateTimer(25, 5)} style={{backgroundColor: '#1ab85e'}}>
                    <ButtonText>25 | 5</ButtonText>
                </Button>
                <Button onPress={() => updateTimer(30, 5)}>
                    <ButtonText>30 | 5</ButtonText>
                </Button>
                <Button onPress={() => updateTimer(35, 5)}>
                    <ButtonText>35 | 5</ButtonText>
                </Button>
            </ButtonContainer>

            <Subtitle>Short Periods</Subtitle>
            <ButtonContainer>
                <Button onPress={() => updateTimer(15, 3)}>
                    <ButtonText>15 | 3</ButtonText>
                </Button>
                <Button onPress={() => updateTimer(10, 3)}>
                    <ButtonText>10 | 3</ButtonText>
                </Button>
                <Button onPress={() => updateTimer(5, 2)}>
                    <ButtonText>5 | 2</ButtonText>
                </Button>
            </ButtonContainer>
        </Container>  // or return your component here
     );
}

export default ConfigScreen;