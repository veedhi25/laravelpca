<?php


namespace PickBazar\Enums;

use BenSampo\Enum\Enum;

/**
 * Class RoleType
 * @package App\Enums
 */
final class Permission extends Enum
{
    public const SUPER_ADMIN = 'super_admin';
    public const STORE_OWNER = 'store_owner';
    public const TEACHER = 'teacher';
    public const STUDENT = 'student';
    public const STAFF = 'staff';
    public const CUSTOMER = 'customer';
}
