import gql from 'graphql-tag';

// gql structure for stream subscription
export const COLOR_SUBSCRIPTION = gql`
    subscription Color_Subscription {
        colors {
            hex
            type
            uid
        }
    }
`
// gql structure to update type of color
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
// gql structure to delete a color tile
export const DELETE_COLOR = gql`
    mutation MyMutation($uid: uuid!) {
        delete_colors_by_pk(uid: $uid) {
            uid
        }
    }
`
// gql structure to add new color to the pallete
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