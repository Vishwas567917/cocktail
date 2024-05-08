//javascriptpro_
//Initial Reference
let cocktailName = document.querySelector('.container .search-box input');
let cocktailNameText = document.querySelector('.container .cocktail-name span');
let drinkImg = document.querySelector('.container .img-box img');
let ingredientsBox = document.querySelector('.ingredients-box .ingredients');
let startMixingBtn = document.querySelector('.start-mixing-btn');
let instructionsBox = document.querySelector('.instructions');
let instruction = document.querySelector('.instructions .instruction');
let closeBtn = document.querySelector('.instructions .close-btn');

 let getCocktail =(cocktail)=>{
 ingredientsBox.innerHTML = '';   
 document.querySelector('.cocktail-data').style.display = 'block';
 document.querySelector('.msg').style.display = 'none';
let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
   fetch(url).then((res)=> res.json()).then((data) =>{
           console.log(data)
      drinkImg.src = data.drinks[0].strDrinkThumb; 
      cocktailNameText.innerHTML = `<span><i class="fa-solid fa-martini-glass-citrus"></i> ${data.drinks[0].strDrink}</span>`;
     
     let myCocktail = data.drinks[0];
     let count = 1;
     let ingredients = [];
     
     for(let i in myCocktail){
        let ingredient = '';
        let measure = '';
        
        if(i.startsWith('strIngredient') && myCocktail[i]){
           ingredient = myCocktail[i];
           measure = myCocktail['strMeasure' + count];
           count += 1;
           ingredients.push(`${measure} ${ingredient}`);
        }
     }
     let ul = document.createElement('ul');
     ingredients.forEach((ingredient)=>{
       let child = document.createElement('li');
       child.innerHTML = ingredient;
       ul.appendChild(child)
       ingredientsBox.appendChild(ul)
     })
     instruction.innerHTML = myCocktail.strInstructions;
   })
 } 
 
cocktailName.addEventListener('keyup',(e)=>{
 if(e.key == 'Enter'){
    if(cocktailName.value != ''){
       getCocktail(cocktailName.value)    
    }    
 }     
})
 
startMixingBtn.addEventListener('click',()=>{
  instructionsBox.style.left = '0px';    
})

closeBtn.addEventListener('click',()=>{
  instructionsBox.style.left = '-100%';    
})
 