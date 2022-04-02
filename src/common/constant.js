export const gradeRange = [
  "小学",
  '七年级上','七年级下','八年级上','八年级下','九年级上','九年级下',
  '高一上','高一下','高二上','高二上','高三上','高三下',
  "大学",
];

export const subjectRange = ['语文', '数学', '英语', '物理', '化学', '其他'];

const baseTypeRange = ['选择题', '填空题', '解答题'];
const languageTypeRange = ['默写', '听写'].concat(baseTypeRange);
export const typeRange = {
  '语文': languageTypeRange,
  '数学': baseTypeRange,
  '英语': languageTypeRange,
  '物理': baseTypeRange,
  '化学': baseTypeRange,
  '其他': languageTypeRange
};

export const difficultRange = ['简单', '中等', '困难', '竞赛'];

export const getSearchRanges = (Eunit) => {
  Eunit = {...Eunit};
  let Etype = {
    '': ["不限"],
    '不限': ["不限"]
  };
  subjectRange.forEach((subject) => {
    Etype[subject] = ['不限'].concat(typeRange[subject]);
    if(!Eunit[subject]){
      Eunit[subject] = ['不限'];
    }
  })
  return {
    Egrade: ['不限'].concat(gradeRange),
    Esubject: ['不限'].concat(subjectRange),
    Edifficulty: ['不限'].concat(difficultRange),
    Etype,
    Eunit,
  };
};

export const AUTO_CORRECT = {
  AUTO: 1,
  MANUAL: 2,
}

export const autoCorrectRange = [{
  value: AUTO_CORRECT.AUTO,
  label: "自动"
},{
  value: AUTO_CORRECT.MANUAL,
  label: "手动"
}];

export const selectionConfigRange = [[2,3,4],["A", "a", "1", "i"]]

export const selectionAnswerRange = [['A', 'B', 'C', 'D'], ['a', 'b', 'c', 'd'], ['1', '2', '3', '4'], ['i', 'ii', 'iii', 'iiii']];