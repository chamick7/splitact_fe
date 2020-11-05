import { atom } from "recoil";

export const accountAtom = atom({
    key: "account",
    default:{}
})

export const activityListAtom = atom({
    key: "activityList",
    default: []
})

export const activityAtom = atom({
    key: "activity",
    default: {}
})


export const allMsgAtom = atom({
    key: "allMsg",
    default: []
})