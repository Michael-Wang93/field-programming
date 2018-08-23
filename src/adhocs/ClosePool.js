import {MetaDropdownSearchField} from '../meta-fields/dropdown'
import {RegisterAdhocField} from '../meta-install/type-register'
import {convertToCascade} from '../../utils/utils'
const LIST = 'list';
const SEARCH = 'search';
const MODEL = 'ClosePool';


@RegisterAdhocField(MODEL, 'saleManId', SEARCH)
export class MetaSaleManIdListField extends MetaDropdownSearchField {
    getOptions = ()=> {
        const options = this.state.options || [];
        if(options.length) {
            return convertToCascade(options, 'value', 'key');
        } else {
            return options;
        }
    }
    processMetaValue = (value) => {
        if (value) {
            return value[value.length - 1];
        } 
        return value
    }
}