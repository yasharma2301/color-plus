import gql from 'graphql-tag';

export const COLOR_SUBSCRIPTION = gql`
    subscription Color_Subscription {
        colors {
            hex
            type
            uid
        }
    }
`

export const TYPE_UPDATE = gql`
    mutation Type_Update($uid: uuid!, $type: String!) {
        update_colors(where: {uid: {_eq: $uid}}, _set: {type: $type}) {
            returning {
                type
                uid
                hex
            }
        }
    }
`

export const DELETE_COLOR = gql`
    mutation MyMutation($uid: uuid!) {
        delete_colors_by_pk(uid: $uid) {
            uid
        }
    }
`

export const ADD_COLOR = gql`
    mutation Add_Color_Mutation($hex: String!, $type: String!) {
        insert_colors(objects: {hex: $hex, type: $type}) {
        returning {
            hex
            type
            uid
        }
        }
    }
`