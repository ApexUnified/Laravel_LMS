<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Course> $courses
 * @property-read int|null $courses_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $short_description
 * @property array<array-key, mixed> $description
 * @property string $thumbnail
 * @property string $thumbnail_public_id
 * @property string|null $promo_video
 * @property string|null $promo_video_public_id
 * @property int|null $category_id
 * @property int|null $instructor_id
 * @property string $price
 * @property int $discount
 * @property string $total_course_duration
 * @property string $level
 * @property string $course_language
 * @property int $is_published
 * @property int $is_approved
 * @property array<array-key, mixed>|null $requirements
 * @property array<array-key, mixed>|null $learning_outcomes
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category|null $category
 * @property-read \App\Models\User|null $instructor
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereCourseLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereInstructorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereIsApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereLearningOutcomes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereMetaDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereMetaTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course wherePromoVideo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course wherePromoVideoPublicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereShortDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereThumbnailPublicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereTotalCourseDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Course whereUpdatedAt($value)
 */
	class Course extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $app_name
 * @property string $contact_email
 * @property string $contact_number
 * @property string|null $app_main_logo_dark
 * @property string|null $app_main_logo_light
 * @property string|null $app_favicon
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereAppFavicon($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereAppMainLogoDark($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereAppMainLogoLight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereAppName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereContactEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereContactNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|GeneralSetting whereUpdatedAt($value)
 */
	class GeneralSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $smtp_mailer
 * @property string $smtp_scheme
 * @property string $smtp_host
 * @property string $smtp_port
 * @property string $smtp_username
 * @property string $smtp_password
 * @property string $smtp_mail_from_address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpHost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpMailFromAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpMailer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpPassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpPort($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpScheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereSmtpUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|SmtpSetting whereUpdatedAt($value)
 */
	class SmtpSetting extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $profile
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Course> $courses
 * @property-read int|null $courses_count
 * @property-read mixed $avatar
 * @property-read mixed $role_id
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProfile($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, $guard = null)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\MustVerifyEmail {}
}

