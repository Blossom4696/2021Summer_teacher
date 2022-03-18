import {subjectRange, typeRange} from "./constant";
import {isValidValue} from "@/common/utils";

export const getSubjectAndType = (value) => {
    if(!Array.isArray(value)){
        return {error: "value is not an array"};
    }
    const [subjectIndex, typeIndex] = value;
    if(!isValidValue(subjectIndex) || !isValidValue(typeIndex)){
        return {error: "invalid index"};
    }
    const subject = subjectRange[subjectIndex];
    const type = typeRange[subject][typeIndex];
    return {subject, type};
}

export const getSubjectAndTypeIndex = (subject, type) => {
    const index = [];
    for(let i = 0; i < subjectRange.length; i++){
        if(subjectRange[i] === subject){
            index.push(i);
        }
    }
    if(index.length < 1){
        return [null, null];
    }
    for(let i = 0; i < typeRange[subject].length; i++){
        if(typeRange[subject][i] === type){
            index.push(i);
        }
    }
    if(index.length < 2){
        index.push(0);
    }
    return index;
}
