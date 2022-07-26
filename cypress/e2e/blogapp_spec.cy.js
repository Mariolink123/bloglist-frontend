/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'Salainen1!',
    }

    const user2 = {
      name: 'fake',
      username: 'root',
      password: 'Rootpassword1!',
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('Salainen1!')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'successfully logged in')
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'wrong credentials')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'Salainen1!' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('a blog created by cypress')
      cy.get('#author-input').type('Mario')
      cy.get('#url-input').type('google.com')
      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
    })

    describe.only('and several blogs exist', function () {
      beforeEach(function () {
        console.log('got into several blogs')
        cy.createBlog({
          title: 'first blog',
          author: 'Robert C Martin.',
          url: 'google.com',
          likes: 3,
        })
        console.log('created nblog')
        /*cy.createBlog({ title: 'second blog', author: 'Edgar Smith', url:'yahoo.com', likes:2 })
        cy.createBlog({ title: 'third blog', author: 'Andrew Woods', url:'amazon.com', likes:1 })*/
      })

      it('a blog can be liked', function () {
        console.log('HI THE USER IS')
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.contains('likes 4')
      })

      it('only the user who created a blog can delete it', function () {
        cy.contains('view').click()
        cy.get('#remove-button').click()
        cy.get('.notification').should('contain', 'Deleted first blog')
        cy.createBlog({
          title: 'first blog',
          author: 'Robert C Martin.',
          url: 'google.com',
          likes: 3,
        })

        cy.login({ username: 'root', password: 'Rootpassword1!' })
        cy.get('#remove-button').should('not.exist')
      })

      it('blogs are ordered by likes', function () {
        cy.createBlog({
          title: 'third blog',
          author: 'Andrew Woods',
          url: 'amazon.com',
          likes: 1,
        })
        cy.createBlog({
          title: 'second blog',
          author: 'Edgar Smith',
          url: 'yahoo.com',
          likes: 2,
        })

        cy.get('.simpleNote').eq(0).should('contain', 'first blog')
        cy.get('.simpleNote').eq(1).should('contain', 'second blog')
      })
    })
  })
})
