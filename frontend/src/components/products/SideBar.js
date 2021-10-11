import React, { Fragment } from 'react'

import 'antd/dist/antd.css'
import { Checkbox, List, Card, Radio, Input, Tooltip, Button, Form } from 'antd'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.categoryChange = this.categoryChange.bind(this)
    this.sort = this.sort.bind(this)
    this.filter = this.filter.bind(this)
  }

  categoryChange(categories) {
    this.props.onChange({ categories: categories })
  }

  sort(event) {
    this.props.onChange({ order: event.target.value })
  }

  filter(value) {
    this.props.onChange({ range: value })
  }

  render() {
    const categories = [
      { label: 'Mobile Phone', value: '0' },
      { label: 'Television', value: '1' },
      { label: 'Laptop', value: '2' },
    ]

    return (
      <Fragment>
        <List>
          <List.Item>
            <Card size='small' title='Categories' className='py-0 my-0 w-100'>
              <Checkbox.Group onChange={this.categoryChange}>
                {categories.map((category) => (
                  <Fragment>
                    <Checkbox key={category.value} value={category.value}>
                      {category.label}
                    </Checkbox>
                    <br />
                  </Fragment>
                ))}
              </Checkbox.Group>
            </Card>
          </List.Item>

          {/* radio buttons */}
          <List.Item>
            <Card size='small' title='Price Range' className='py-0 my-0 w-100'>
              <Radio.Group className='mb-3' onChange={this.sort}>
                <Radio value='asc'>Lowest to Highest</Radio>
                <Radio value='desc'>Highest to Lowest</Radio>
              </Radio.Group>

              <Form name='priceRangeForm' onFinish={this.filter}>
                <div className='row px-1'>
                  <Tooltip placement='bottom' title='Minimum Price'>
                    <Form.Item
                      className='col-4 px-0 mx-0'
                      name='from'
                      rules={[{ required: true, message: '' }]}
                    >
                      <Input type='number' prefix='Rs.' placeholder='Min' />
                    </Form.Item>
                  </Tooltip>

                  <div className='col-1 px-1' style={{ marginTop: '3px' }}>
                    to
                  </div>

                  <Tooltip placement='bottom' title='Maximum Price'>
                    <Form.Item
                      className='col-4 px-0'
                      name='to'
                      rules={[{ required: true, message: '' }]}
                    >
                      <Input type='number' prefix='Rs.' placeholder='Max' />
                    </Form.Item>
                  </Tooltip>

                  <Form.Item className='col-2 px-1'>
                    <Button type='primary' htmlType='submit'>
                      Go
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Card>
          </List.Item>
        </List>
      </Fragment>
    )
  }
}

export default SideBar
