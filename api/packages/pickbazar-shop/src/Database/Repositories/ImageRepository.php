<?php

namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\Image;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Exceptions\RepositoryException;


class ImageRepository extends BaseRepository

{

    public function model()
    {
        return Image::class;
    }

    public function findOrFail($id)
    {
        return Image::findOrFail($id);
    }

    public function create($data)
    {
        $image = new Image();
        $image->image_data = json_encode($data['image_data']); // Encode image_data array as JSON string
        $image->user_id = $data['user_id'];
        $image->save();
    
        return $image;
    }
    


    public function update($id, $data)
    {
        $image = $this->findOrFail($id);
        $image->update($data);

        return $image;
    }

    public function delete($id)
    {
        $image = $this->findOrFail($id);
        $image->delete();
    }

}
