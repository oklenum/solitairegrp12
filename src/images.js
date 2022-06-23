/*
Image Assets Downloaded from https://yaomon.itch.io/playing-cards
*/

import {
    C1,C2,C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,C13,D1,D2,D3,D4,D5,D6,D7,D8,D9,D10,D11,D12,D13,
    H1,H2,H3,H4,H5,H6,H7,H8,H9,H10,H11,H12,H13,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13, Back,
} from "./assets"

export function cardImage (card) {
    if (card === "AC") {
        return C1
    }
    if (card === "2C") {
        return C2
    }
    if (card === "3C") {
        return C3
    }
    if (card === "4C") {
        return C4
    }
    if (card === "5C") {
        return C5
    }
    if (card === "6C") {
        return C6
    }
    if (card === "7C") {
        return C7
    }
    if (card === "8C") {
        return C8
    }
    if (card === "9C") {
        return C9
    }
    if (card === "10C") {
        return C10
    }
    if (card === "JC") {
        return C11
    }
    if (card === "QC") {
        return C12
    }
    if (card === "KC") {
        return C13
    }
    if (card === "AD") {
        return D1
    }
    if (card === "2D") {
        return D2
    }
    if (card === "3D") {
        return D3
    }
    if (card === "4D") {
        return D4
    }
    if (card === "5D") {
        return D5
    }
    if (card === "6D") {
        return D6
    }
    if (card === "7D") {
        return D7
    }
    if (card === "8D") {
        return D8
    }
    if (card === "9D") {
        return D9
    }
    if (card === "10D") {
        return D10
    }
    if (card === "JD") {
        return D11
    }
    if (card === "QD") {
        return D12
    }
    if (card === "KD") {
        return D13
    } 
    if (card === "AH") {
        return H1
    }
    if (card === "2H") {
        return H2
    }
    if (card === "3H") {
        return H3
    }
    if (card === "4H") {
        return H4
    }
    if (card === "5H") {
        return H5
    }
    if (card === "6H") {
        return H6
    }
    if (card === "7H") {
        return H7
    }
    if (card === "8H") {
        return H8
    }
    if (card === "9H") {
        return H9
    }
    if (card === "10H") {
        return H10
    }
    if (card === "JH") {
        return H11
    }
    if (card === "QH") {
        return H12
    }
    if (card === "KH") {
        return H13
    }
    if (card === "AS") {
        return S1
    }
    if (card === "2S") {
        return S2
    }
    if (card === "3S") {
        return S3
    }
    if (card === "4S") {
        return S4
    }
    if (card === "5S") {
        return S5
    }
    if (card === "6S") {
        return S6
    }
    if (card === "7S") {
        return S7
    }
    if (card === "8S") {
        return S8
    }
    if (card === "9S") {
        return S9
    }
    if (card === "10S") {
        return S10
    }
    if (card === "JS") {
        return S11
    }
    if (card === "QS") {
        return S12
    }
    if (card === "KS") {
        return S13
    }           
    if (card === "") {
        return Back
    }
}