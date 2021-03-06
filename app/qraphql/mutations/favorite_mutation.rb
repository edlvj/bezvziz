module FavoriteMutation
  Create = GraphQL::Relay::Mutation.define do
    name "AddFavorite"
    
    input_field :city_id, !types.ID
    input_field :visited, !types.Boolean

    return_field :favorite, FavoriteInterface
    return_field :errors, types.String

    resolve ->(object, inputs, ctx) {
      favorite = Favorite.find_or_initialize_by(user: ctx[:current_user], city_id: inputs[:city_id])
      favorite.visited = inputs[:visited]
      
      if favorite.save
        { favorite: favorite }
      else
        { errors: favorite.errors.to_a }
      end
    }
  end
end