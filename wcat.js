// 1- node wcat.js filepath => displays content of the file in the terminal 
let fs=require("fs");
let path=require("path");

let inputArr=process.argv.slice(2);
let content="";

let optionArr=[];
let fileArr=[];
for(let i=0;i<inputArr.length;i++){
    if(inputArr[i].charAt(0)=="-"){
        optionArr.push(inputArr[i]);
    }else{
        fileArr.push(inputArr[i]);
    }
}

for(let i=0;i<fileArr.length;i++){
    let exist=fs.existsSync(fileArr[i]);
    if(exist){
        content+=fs.readFileSync(fileArr[i])+"\r\n";
    }else{
        console.log("File doesn't exist");
    }
}
let contentArr=content.split("\r\n");
let isSPresent=optionArr.includes("-s");
if(isSPresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr=[];
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]!=null) 
            tempArr.push(contentArr[i]);
    }
    contentArr=tempArr;
}
let indexofN=optionArr.indexOf("-n");
let indexofB=optionArr.indexOf("-b");
let finalOption="";
if(indexofB>-1 && indexofN>-1){
    if(indexofB < indexofN) finalOption="-b";
    else finalOption="-n";
}else{
    if(indexofB!=-1) finalOption="-b";
    if(indexofN!=-1) finalOption="-n";
}

if(finalOption!=""){
    if(finalOption=="-n"){
        for(let i=0;i<contentArr.length;i++){
            contentArr[i]=(i+1)+"."+contentArr[i];
        }
    }
    else if(finalOption=="-b"){
        let count=1;;
        for(let i=0;i<contentArr.length;i++){
            if(contentArr[i]!=""){
                contentArr[i]=(count)+"."+contentArr[i];
                count++;
            }
        }
    }
}

console.log(contentArr.join("\r\n"));


