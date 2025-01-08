import { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Container, ButtonContainer, Button, ButtonText, Title, Subtitle } from "../../components/ConfigComponents";

function ConfigScreen({ navigation }) {
    const { defaultWorkMinutes, defaultPauseMinutes, setDefaultWorkMinutes, setDefaultPauseMinutes } = useContext(DataContext)

    const updateTimer = (workMinutes, pauseMinutes) => {
        navigation.navigate("Timer")
        setDefaultWorkMinutes(workMinutes)
        setDefaultPauseMinutes(pauseMinutes)
    }

    const setBackgroundColor = (dfwm, dfpm) => {
        if (dfwm === defaultWorkMinutes & dfpm === defaultPauseMinutes) {
            return '#1ab85e'
        }
        return null
    }
    return ( 
        <Container>
            <Title>Configuration</Title>
            <Subtitle>Long Periods</Subtitle>
            <ButtonContainer>
                <Button onPress={() => updateTimer(25, 5)} style={{backgroundColor: setBackgroundColor(25, 5)}} disabled={25 == defaultWorkMinutes}>
                    <ButtonText>25 | 5</ButtonText>
                </Button>
                <Button onPress={() => updateTimer(30, 5)} style={{backgroundColor: setBackgroundColor(30, 5)}} disabled={30 == defaultWorkMinutes}>
                    <ButtonText>30 | 5</ButtonText>
                </Button>
                <Button onPress={() => updateTimer(35, 5)} style={{backgroundColor: setBackgroundColor(35, 5)}} disabled={35 == defaultWorkMinutes}>
                    <ButtonText>35 | 5</ButtonText>
                </Button>
            </ButtonContainer>

            <Subtitle>Short Periods</Subtitle>
            <ButtonContainer>
                <Button onPress={() => updateTimer(15, 3)} style={{backgroundColor: setBackgroundColor(15, 3)}} disabled={15 == defaultWorkMinutes}>
                    <ButtonText>15 | 3</ButtonText>
                </Button>
                <Button onPress={() => updateTimer(10, 3)} style={{backgroundColor: setBackgroundColor(10, 3)}} disabled={10 == defaultWorkMinutes}>
                    <ButtonText>10 | 3</ButtonText>
                </Button>
                <Button onPress={() => updateTimer(5, 2)} style={{backgroundColor: setBackgroundColor(5, 2)}} disabled={5 == defaultWorkMinutes}>
                    <ButtonText>5 | 2</ButtonText>
                </Button>
            </ButtonContainer>
        </Container>  // or return your component here
     );
}

export default ConfigScreen;