const router = require('express').Router();
const {
  renderSearchPage,
  fetchSearchResultInPage,
  autoSuggestionFetch
} = require('../controllers/search')
const { isAuth} = require('../middlewares')


router.get('/:searchQuery',renderSearchPage);
router.post('/fetch/:searchQuery/:limit',fetchSearchResultInPage)
router.post('/autoSuggestion/:key',autoSuggestionFetch)

module.exports = router;