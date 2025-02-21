import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'

import { Checkbox } from '../ui/checkbox'
import { SelectSeparator } from '../ui/select'
import { Separator } from '../ui/separator'
import { Filter } from 'lucide-react'

const Filterproducts = ({ filters, handleFilter }) => {
  return (
    <div className=' bg-background rounded-lg shadow-sm pt-16  '>
      <div className='p-4 border-b'>
      
        <h2 className='text-lg font-semibold flex text-lime-900'>Filters <span> <Filter /></span></h2>
        
      </div>
     
      <div className='p-4 space-y-4'>
        {
          Object.keys(filterOptions).map((keyItem) => (<Fragment>
            <div>
              <h3 className='text-base font-bold'> {keyItem}</h3>

              <div className='grid gap-2 mt-2'>
                {
                  filterOptions[keyItem].map(option => <Label className="flex item-center gap-2 font-medium">
                    <Checkbox
                       checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)} />
                    {option.label}
                  </Label>)
                }
              </div>

            </div>
            <Separator />
          </Fragment>))
        }
      </div>
    </div>
  )
}

export default Filterproducts
