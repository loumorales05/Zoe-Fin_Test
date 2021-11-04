/// <reference types="Cypress" />

describe('Rescheduler test suite', ()=> {
        before/*Each*/(() => {
                cy.visit('https://portal-test.zoefin.com/reschedule/6b3b5950-3bfb-11ec-a7de-575047d771f4')
                cy.wait(2500)
          })
          beforeEach(() => {
            cy.wait(1000)
      })
          
        it('Selecting reschedule day verification', ()=> {   
            //Verifying times options are not visible before selecting a day
            cy.get('.styles__TimesContainer-sc-13m8152-7').should('not.be.visible') 
            //Getting a random day value to select from calendar
            var daySelect = Math.floor(Math.random() * 30)          
             
            cy.get('.CCDatesView__days').find('div.CCDatesView__days_day').as('dayList')
            .each(($el, index=1, $list) => {       
                //Storing class value to differentiate available days from non available days
                const dayClass = $el.attr('class')              
                //Assuring that selected day is between available days rank
                if(index >= daySelect) {
                    if(!dayClass.includes('CCDatesView__days_day--disabled')){  
                        cy.clickChild('@dayList',index,true)
                        return false
                    }
                }                                                
            })       
            //Verifying times options are visible after selecting a day        
            cy.get('.styles__TimesContainer-sc-13m8152-7').should('be.visible')  
            
             
        }
        )

       it('Selecting reschedule time verification', ()=> { 
           //Getting a random time value to select
           var timeSelect = Math.floor(Math.random() * 20) 
           cy.get('.CCTimesView__times').find('div.CCTimesView__times_time').as('timeList')

           cy.get('@timeList')
           .each(($el, index, $list) => {
               if($list.length-1<timeSelect) {
                   cy.clickChild('@timeList',0,false)
                   return false                
               }
               else if(index==timeSelect) {           
                   cy.clickChild('@timeList',index,false)
                   return false                     
               }                                                
           })
           //Verifying times selected is marked  
           cy.get('.CCTimesView__times_time--active').should('be.visible')
           //Verifying meeting type area is visible  
           cy.get('.dnYxbU').should('be.visible')
           //Verifying reschedule button is visible
           cy.get('.ZUIButton--primary').should('be.visible').click()
           //Verifying reschedule confirm modal is visible
           cy.get('.styles__StyledModal-sc-zn5p9u-0').should('be.visible')
           
        })

        it('Submit reschedule verification', ()=> { 
            
            //Verifying that reschedule fields are not empty - All fields can be verified this way
            cy.get('.modal-dashboard__container > .meeting > .meeting__list > .heading > .meeting__time').should('not.be.empty')
             //Verifying reschedule confirm button is visible
            cy.get('.confirmation-schedule__ctas > .ZUIButton--primary').should('be.visible').click()
            //Verifying reschedule successful modal is visible
            cy.get('.modal-dashboard__successful').should('be.visible')
            
         })
    }
)