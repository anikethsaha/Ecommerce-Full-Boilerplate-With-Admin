# Editing and Helping  guide for the project


## 1. To add Old And Premium Banner in product display page
  - go do ` src/views/product-details.ejs `
  - add the below code in line number 307
  code :
  ```bash
      <%
        if(productDetails.QualityType == "Premium"){
            %>
            <span class="pro-tag cost m-shadow p" ><%= productDetails.QualityType %>  </span>
            <%
        }else{
            %> <span class="pro-tag cost m-shadow " ><%= productDetails.QualityType %>  </span>
            <%
        }

        %>
  ```

## 2. To add More Categories in the menu
- Go to `src/views/layouts/left-sub-menu.ejs` file
- You can find code similar to this   
```bash        
   <li class="col-md-12" >
       <a href="/product/book/-YOUR CATEGORY NAME HERE-"><span class="" >- YOUR CATEGORY NAME HERE - </span> </a>
       <i class="fa fa-angle-right" aria-hidden="true"></i>
   </li>        
```  

- Instead of `   -YOUR CATEGORY NAME HERE-    ` there will be a category name
- So you can Add the above code and just replace `   -YOUR CATEGORY NAME HERE-   `  with the category you want
- lines you can add on
   - no.53 - for column 1
   - no.71 - for column 2
   - no.94 - for column 3
- Remember your category spelling should be exactly same as the one you added through admin panel
- It should be capitialised

## 3. To change the logo
- Go to `src/views/layouts/header.ejs`
- 2. go to line 64    
- 3. in the src part change with your image link    
  **or**
- add your logo with `logo.png` in `website-img` folder in `public/images` folder
- delete the previous one


## 4. To change the website name in the footer
- Go to `src/views/layouts/bottom-footer.ejs` file
- In line 35 replace the `WebsiteName` with your website name

## 5. Payment Details Changes
- go to  
- `src/views/layouts/payment/payment-option-cart.ejs` from 128 line
- `src/views/layouts/payment/payment-option.ejs` from 117 line
    
    
    
## Need more help ?

Feel free to create a issue or mail me @ `anik220798@gmail.com`

## Want to add more guide 

Feel free to create PR
