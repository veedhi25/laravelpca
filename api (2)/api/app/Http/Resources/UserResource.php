<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use PickBazar\Enums\Permission;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role(),
            "phone_number"=>$this->phone_number,
            'current_location' => $this->current_location,
            'gender'=> $this->gender,
            'date_of-birth'=> $this->date_of_birth,
            'occupation' => $this->occupation,
            "is_active"=>$this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }


    public function role(){
        if($this->hasPermissionTo(Permission::SUPER_ADMIN)){
            return "Super Admin";
        }else if($this->hasPermissionTo(Permission::STORE_OWNER)){
            return "Store Owner";
        }else if($this->hasPermissionTo(Permission::STAFF))
        {
            return "Staff";
        }
        else if($this->hasPermissionTo(Permission::TEACHER))
        {
            return "Teacher";
        }
        else if($this->hasPermissionTo(Permission::STUDENT))
        {
            return "Student";
        }else if($this->hasPermissionTo(Permission::CUSTOMER)){
            return "Customer";
        }
    }
}
