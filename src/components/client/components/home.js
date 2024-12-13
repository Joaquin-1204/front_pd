import {Alert, Box, Button, Divider, Grid, IconButton, MenuItem, Select, Snackbar, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import homeStyle from './home.module.css'
import ProductCard from './productCard'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { getUserDetails } from '../../../services/auth'
import ProductForm from '../../client/components/productForm'
import { getAllProducts, getBestProducts } from '../../../services/product'
import { addToCart } from '../../../services/shoppingCart'
import {cartManager} from "../../../services/observer/observer";
import SortByPrice from "../../../services/strategy/SortByPrice";
import SortByName from "../../../services/strategy/SortByName";



const strategies = {
    price: new SortByPrice(),
    name: new SortByName(),
};


function Home() {
  const [roles, setUserRole] = useState([{}])
  const [productList, setProductList] = useState([])
  const [bestProductList, setBestProductList] = useState([])
  const [product, setProduct] = useState({ name: "", price: 0, description: "", category: "", image: "" })
  const [refresh, setRefresh] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' })
    const [sortStrategy, setSortStrategy] = useState("price");


  useEffect(() => {
    getUserDetails({ setUserRole })
    getAllProducts({ setProductList })
    getBestProducts({ setBestProductList })
  }, [refresh])

  const handleOpenModal = () => setOpenModal(true)
  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false, status:showProductFeedback.status });
  };

    const addProduct = (productToAdd, amountToAdd) => {
        setProductFeedback({ show: true, status: true, infoText: 'Añandiendo producto...' })
        addToCart({ amountToAdd, productToAdd })
        cartManager.addToCart(productToAdd, amountToAdd)
    }

    const handleSortChange = (event) => {
        setSortStrategy(event.target.value);
    };

    const sortedProducts = strategies[sortStrategy].sort([...bestProductList]);


    return (
    <div className={homeStyle.container}>
        <Box className={homeStyle.title_container} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 2
        }} >
            <div>
            <div>
                {roles.length > 1 ? <Button variant="text" color='success'
                                            id="button" onClick={handleOpenModal}>
                    Añadir nuevo producto
                </Button> : null}
            </div>
            <Typography variant="span" fontSize={35} component="h2" ml={1} fontWeight={600}>
                Destacados
            </Typography>
            <Typography variant="p" fontSize={20} component="h2" ml={1} fontWeight={400}>
                Productos a mejor precio
            </Typography>
            </div>
            <div>
                <Typography variant="body1" fontWeight={500} mr={2} display="inline">
                    Ordenar por:
                </Typography>
                <Select
                    value={sortStrategy}
                    onChange={handleSortChange}
                    displayEmpty
                    inputProps={{"aria-label": "Sort by"}}
                >
                    <MenuItem value="price">Precio</MenuItem>
                    <MenuItem value="name">Nombre</MenuItem>
                </Select>
            </div>
        </Box>
        <Grid container spacing={3} className={homeStyle.grid} mb={2}>
            {sortedProducts.map(productItem =>
                <Grid item xs={12} md={3} style={{position: 'relative'}} key={productItem.id}>
                    <IconButton color='primary' onClick={() => {
                        addProduct(productItem, 1)
                    }}
                                className={homeStyle.add__button}>
                        <AddShoppingCartIcon/>
                    </IconButton>
                    <ProductCard product={productItem}/>
                </Grid>)
            }
        </Grid>
      <Divider></Divider>
      <div className={homeStyle.title_container}>
        <Typography variant="span" fontSize={30} component="h2" ml={1} fontWeight={600}>
          Todos los productos
        </Typography>
      </div>
      <Grid container spacing={3} className={homeStyle.grid} >
        {productList.map(productItem =>
          <Grid item xs={12} md={3} style={{ position: 'relative' }} key={productItem.id}>
            <IconButton aria-label="add to shopping cart" color='primary' onClick={() => {
              addProduct(productItem, 1)
            }}
              className={homeStyle.add__button}>
              <AddShoppingCartIcon />
            </IconButton>
            <ProductCard product={productItem} />
          </Grid>)}
      </Grid>
      <Snackbar open={showProductFeedback.show} autoHideDuration={2000} onClose={closeProductFeedback}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
         <Alert onClose={closeProductFeedback} severity={showProductFeedback.status ? "success" : "error"} sx={{ width: '100%' }}>
          {showProductFeedback.infoText}
        </Alert>
      </Snackbar>
      <ProductForm setRefresh={setRefresh} openModal={openModal} setOpenModal={setOpenModal}
        setProductFeedback={setProductFeedback} edit={false}
        setProduct={setProduct} product={product} />
    </div>
    
  )
}

export default Home