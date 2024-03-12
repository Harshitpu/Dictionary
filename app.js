const form=document.querySelector('form');
const result=document.querySelector('.result');


form.addEventListener('submit',(e)=>{
      e.preventDefault();
      getwordinfo(form.elements[0].value);
});


const getwordinfo=async (word)=>{
    try {
        result.innerHTML="Please Wait Fetching Data..."
        const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data=await response.json();
    console.log(data);
    let definitions=data[0].meanings[0].definitions[0];

    result.innerHTML=`
            <h2><strong>Word:</strong>${data[0].word}</h2>
            <p class="part">${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Meaning:</strong>${definitions.definition===undefined?"Not Found":definitions.definition}</p>
            <p><strong>Example:</strong>${definitions.example===undefined?"Not Found":definitions.example}</p>
            <p><strong>Antonyms:</strong></p>
            
            `;
            if(definitions.antonyms.length===0)
            {
                result.innerHTML +=`<span>Not Found</span>`;
            }
            else{
                for(let i=0;i<definitions.antonyms.length;i++) {
                    result.innerHTML +=`<li>${definitions.antonyms[i]}</li>`
                 }

            }
            result.innerHTML+=`<p><strong>Synonyms:</strong></p>`;
            if(definitions.synonyms.length===0)
            {
                result.innerHTML +=`<span>Not Found</span>`;
            }
            else{
                for(let i=0;i<definitions.synonyms.length;i++) {
                    result.innerHTML +=`<li>${definitions.synonyms[i]}</li>`
                 }

            }

            result.innerHTML+=`<div><a href="${data[0].sourceUrls}" target=_blank>Read More</a></div>`;
    
    } catch (error) {
        result.innerHTML=`<p>Sorry, The Word Could Not Be Found</p>`;
    }
    
};



