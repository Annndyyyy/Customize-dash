import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WidgetContainer from '../../components/WidgetContainer';
import BackToDashboard from '../../components/BackToDashboard';

const SearchContainer = styled.div`
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: rgba(255,255,255,0.12);
  color: #fff;
  margin-bottom: 14px;
  font-size: 1.08rem;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  outline: 1.5px solid rgba(255,255,255,0.18);
  box-sizing: border-box;
  transition: box-shadow 0.2s, outline 0.2s;
  &:focus {
    box-shadow: 0 4px 24px rgba(60, 72, 88, 0.18);
    outline: 2px solid #a5b4fc;
  }
  &::placeholder {
    color: #cccccc;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  border: none;
  background: rgba(255,255,255,0.12);
  color: #fff;
  font-size: 1.08rem;
  margin-bottom: 14px;
  box-shadow: 0 2px 12px rgba(60, 72, 88, 0.10);
  box-sizing: border-box;
  outline: 1.5px solid rgba(255,255,255,0.18);
  transition: box-shadow 0.2s, outline 0.2s;
  &:focus {
    box-shadow: 0 4px 24px rgba(60, 72, 88, 0.18);
    outline: 2px solid #a5b4fc;
  }
  &::placeholder {
    color: #cccccc;
  }
`;

const RecipeList = styled.div`
  display: grid;
  grid-template-columns: ${({ isLimitedCategory }) =>
    isLimitedCategory ? 'repeat(4, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))'};
  gap: 20px;
  max-height: ${({ isLimitedCategory }) => (isLimitedCategory ? '950px' : '950px')};
  overflow-y: auto;
  padding: 8px 10px;

  @media (max-width: 480px) {
    grid-template-columns: ${({ isLimitedCategory }) => (isLimitedCategory ? '1fr' : '1fr')};
    padding: 8px 0;
  }
`;

const RecipeCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.10) 60%, rgba(120,120,255,0.10) 100%);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.13);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  position: relative;
  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 8px 32px rgba(120, 120, 255, 0.18);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  flex-grow: 1;
`;

const RecipeInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 14px;
  background: rgba(0, 0, 0, 0.5);
`;

const RecipeName = styled.h4`
  margin: 0 0 6px 0;
  color: #fff;
  font-size: 1.08rem;
  font-weight: 700;
  word-wrap: break-word;
  white-space: normal;
`;

const RecipeCategory = styled.p`
  margin: 0;
  color: #c7d2fe;
  font-size: 0.97rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 41, 59, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(40,40,80,0.98) 60%, rgba(80,80,120,0.98) 100%);
  border-radius: 22px;
  padding: 28px 24px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: #fff;
`;

const CloseButton = styled.button`
  background: rgba(255,255,255,0.10);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  color: #fff;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: rgba(255,255,255,0.22);
  }
`;

const RecipeDetail = styled.div`
  margin-bottom: 12px;
`;

const RecipeDetailTitle = styled.h4`
  margin: 0 0 4px 0;
`;

const RecipeDetailText = styled.p`
  margin: 0 0 2px 0;
`;

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

const WidgetTitle = styled.h2`
  margin: 0;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
`;

const RecipeWidget = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        setCategories(response.data.categories);
      } catch (error) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        if (selectedCategory !== 'all') {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        }
        const response = await axios.get(url);
        const meals = response.data.meals || [];
        const categoriesToLimit = ['Beef', 'Chicken', 'Dessert', 'Vegetarian'];
        if (categoriesToLimit.includes(selectedCategory)) {
          setRecipes(meals.slice(0, 16));
        } else {
          setRecipes(meals);
        }
      } catch (error) {
        setRecipes([]);
      }
    };
    fetchRecipes();
  }, [selectedCategory]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRecipeClick = async (recipeId) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      setSelectedRecipe(response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <WidgetContainer>
      <BackToDashboard />
      <WidgetHeader>
        <WidgetTitle>Recipe Finder</WidgetTitle>
      </WidgetHeader>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FilterSelect value={selectedCategory} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </FilterSelect>
      </SearchContainer>
      <RecipeList isLimitedCategory={['Beef', 'Chicken', 'Dessert', 'Vegetarian'].includes(selectedCategory)}>
        {filteredRecipes.length === 0 ? (
          <div>No recipes found for this category or search term.</div>
        ) : (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.idMeal} onClick={() => handleRecipeClick(recipe.idMeal)}>
              <RecipeImage
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Available';
                }}
              />
              <RecipeInfo>
                <RecipeName>{recipe.strMeal}</RecipeName>
                <RecipeCategory>{recipe.strCategory}</RecipeCategory>
              </RecipeInfo>
            </RecipeCard>
          ))
        )}
      </RecipeList>
      {selectedRecipe && (
        <Modal onClick={() => setSelectedRecipe(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedRecipe.strMeal}</ModalTitle>
              <CloseButton onClick={() => setSelectedRecipe(null)}>×</CloseButton>
            </ModalHeader>
            <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} style={{ width: '100%', borderRadius: '18px', marginBottom: '18px', objectFit: 'cover', maxHeight: '260px', background: '#222' }} />
            <RecipeDetail>
              <RecipeDetailTitle>Category</RecipeDetailTitle>
              <RecipeDetailText>{selectedRecipe.strCategory}</RecipeDetailText>
            </RecipeDetail>
            <RecipeDetail>
              <RecipeDetailTitle>Cuisine</RecipeDetailTitle>
              <RecipeDetailText>{selectedRecipe.strArea}</RecipeDetailText>
            </RecipeDetail>
            <RecipeDetail>
              <RecipeDetailTitle>Instructions</RecipeDetailTitle>
              <RecipeDetailText>{selectedRecipe.strInstructions}</RecipeDetailText>
            </RecipeDetail>
            <RecipeDetail>
              <RecipeDetailTitle>Ingredients</RecipeDetailTitle>
              {[1, 2, 3, 4, 5].map(num => {
                const ingredient = selectedRecipe[`strIngredient${num}`];
                const measure = selectedRecipe[`strMeasure${num}`];
                if (ingredient && ingredient.trim()) {
                  return (
                    <RecipeDetailText key={num}>
                      {measure} {ingredient}
                    </RecipeDetailText>
                  );
                }
                return null;
              })}
            </RecipeDetail>
          </ModalContent>
        </Modal>
      )}
    </WidgetContainer>
  );
};

export default RecipeWidget; 