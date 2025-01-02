import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #1E213F;
    align-items: center;
`

export const Title = styled.Text`
    font-size: 30px;
    color: #fff;
    text-align: center;
    margin-top: 80px;
`

export const Subtitle = styled.Text`
    font-size: 19px;
    padding: 0px 0px 10px 10px;
    display: flex;
    font-style: italic;
    margin-top: 80px;
    width: 100%;
    text-align: start;
    color: #fff;
`

export const ButtonContainer = styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
   
`

export const Button = styled.TouchableOpacity`
    border: 1px solid #c5c5c5;
    padding: 10px 20px;
    border-radius: 15px;
`

export const ButtonText = styled.Text`
    font-size: 20px;
    color: #fff;
    text-align: center;
`