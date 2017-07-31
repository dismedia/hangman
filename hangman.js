const length = (x) => x.length
const sum = (a, b) => a+b

const indexesOf = (substr) => ({
  in: (str) => (
    str
    .split(substr)
    .slice(0, -1)
    .map(length)
    .map((_, i, lengths) => (
      lengths
      .slice(0, i+1)
      .reduce(sum, i*substr.length)
    ))
  )  
});



var keyStream = Rx.Observable.fromEvent(window, 'keydown')

.filter((l)=>/[a-z]/.test(l)) 
.map(l=>l.key)


var wordStream=Rx.Observable.of("martinez")

hangmanStream=Rx.Observable
.combineLatest(keyStream,wordStream,(k,w)=>({key:k,word:w}))
.scan((a,input)=>{

	a.guess==null? a.guess=new Array(input.word.length).fill(" "):void 0
  a.introducedLetters==null? a.introducedLetters=[]:void 0


	if(a.introducedLetters.join("").concat(input.word).indexOf(input.key)==-1){
  	a.introducedLetters.push(input.key);
  } 

	indexesOf(input.key).in(input.word).map((i)=>{
   a.guess[i]=input.word[i];
  })


	return{
    key:input.key,
  	guess:a.guess,
  	word:input.word,
    introducedLetters:a.introducedLetters
  }
  
},{})
.subscribe((a)=>{
console.log(a.guess)
console.log(a.introducedLetters)

})