import {MetaBaseListField, MetaBaseSearchField} from './base'
import {RegisterMetaField} from '../meta-install/type-register'
import {getActions} from '../meta-install/action-register'
import Operation from '../shared/actions/operation'
const TYPE = 'action';
const LIST = 'list';


@RegisterMetaField(TYPE, LIST)
export class MetaActionListField extends MetaBaseListField {

    getProps() {
        const { meta } = this.props;
        const actions = getActions(meta.model);
        return Object.assign({}, this.props, {
            actions: actions
        })
    }

    render() {
        const props = this.getProps();
        return (
            <Operation
                {...props}
            ></Operation>
        )
    }
}
