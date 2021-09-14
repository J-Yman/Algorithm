function solution(s) {
    const numberMap = new Map();
    let numStack = '';
    
    for(const char of s) {
        if(!isNaN(char)) {
            numStack += char;
        } else {
             numberMap.has(numStack) ? numberMap.set(numStack, numberMap.get(numStack) + 1) : numberMap.set(numStack, 1);  
            numStack = ``;
        } 
    }
    
   const tuple = [...numberMap.entries()].sort((a,b) => b[1] - a[1]).map((arr) => Number(arr[0])).filter((v) => v);
   return tuple
  
}
