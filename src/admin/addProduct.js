import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct } from './adminApi';
import { Button, Typography, Input, Upload, Icon } from 'antd';
const { Title } = Typography;
const { Search } = Input;

const AddProduct = () => {
  // Define product object state using useState hooks then initialize product object state.
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  });

  // destructure
  const { user, token } = isAuthenticated();

  // Destructuring because easy to use into the form
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  /** useEffect hooks
   * Form data to be available as soon as the component mounts
   */
  useEffect(() => {
    // ...values mean grap rest of data
    setValues({ ...values, formData: new FormData() });
  }, []);

  /** Define handleChange using higher order function
   * function name return event function ?
   */
  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const addProductSubmit = event => {};

  // Create new product form
  const postNewProductForm = () => (
    <form className='mb-3' onSubmit={addProductSubmit}>
      <h4>Display Product</h4>
      <div className='form-group'>
        <Title level={4}>
          <Upload>
            <Button>
              <Icon type='upload' /> Click to Upload
            </Button>
          </Upload>
          {/* <Input type='file' name='photo' accept='image/*'></Input> */}
        </Title>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
        />
      </div>

      <Button type='primary' className='btn btn-outline-primary'>
        Create Product
      </Button>
    </form>
  );

  return (
    <Layout
      title='Add a new product'
      description={`Admin ${user.name}, Are you ready to add a new product ?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>{postNewProductForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;
