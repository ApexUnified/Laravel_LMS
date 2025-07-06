<?php

use App\Http\Controllers\AllCourseController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CoursePlayerController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MyCourseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseCourseController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Category Routes
    Route::resource('/category', CategoryController::class)->except(['show']);
    Route::delete('/category-delete-by-selectetion', [CategoryController::class, 'deleteBySelection'])->name('category.deletebyselection');

    // User Routes
    Route::resource('/users', UserController::class);
    Route::delete('users-destroybyselection', [UserController::class, 'destroyBySelection'])->name('users.destroybyselection');

    // Course Routes
    Route::resource('/courses', CourseController::class)->except(['show']);
    Route::delete('/courses-destroybyselection', [CourseController::class, 'destroyBySelection'])->name('courses.destroybyselection');

    // Lesson Routes
    Route::resource('/lessons', LessonController::class)->except(['show']);
    Route::delete('/lessons-delete-by-selectetion', [LessonController::class, 'destroyBySelection'])->name('lessons.destroybyselection');

    // Course Player
    Route::get('/course-player/{course_slug}', [CoursePlayerController::class, 'coursePlayer'])->name('courses.player');
    Route::get('/course-player/{course_slug}/{lesson_slug}', [CoursePlayerController::class, 'lessonPlayer'])->name('lessons.player');
    Route::post('/course-player-update-lesson-progress', [CoursePlayerController::class, 'UpdateLessonProgress'])->name('lessons.update.progress');

    // Enrollment Routes
    Route::resource('/enrollments', EnrollmentController::class)->except(['show', 'edit', 'update']);
    Route::get('/enrollments-get-courses-related-to-user/{user_id}', [EnrollmentController::class, 'GetCoursesRelatedToUser'])->name('enrollments.getcourse.relatedtouser');
    Route::delete('/enrollments-destroybyselection', [EnrollmentController::class, 'destroyBySelection'])->name('enrollments.destroybyselection');

    // My Courses Routes
    Route::get('/my-courses', MyCourseController::class)->name('my.courses');

    // All  Courses Routes
    Route::get('/all-courses', AllCourseController::class)->name('all.courses');

    // Purchase Course Route
    Route::post('/purchase-course', PurchaseCourseController::class)->name('purchase.course');
    Route::get('/purchase-success', [PurchaseCourseController::class, 'success'])->name('purchase.success');
    Route::get('/purchase-cancel', [PurchaseCourseController::class, 'cancel'])->name('purchase.cancel');

    // Profile Routes
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'index')->name('profile.index');
        Route::put('/profile-update', 'updateProfile')->name('profile.update');
        Route::put('/profile-password-update', 'updatePassword')->name('profile.password.update');
        Route::delete('/profile/account-destroy', 'destroyAccount')->name('profile.account.destroy');
    });

    // Setting Routes
    Route::controller(SettingController::class)->as('settings.')->group(function () {
        Route::get('/settings', 'index')->name('index');

        // General Setting Routess
        Route::get('/settings/general-setting', 'generalSetting')->name('general.setting');
        Route::put('/settings/general-setting-update', 'updateGeneralSetting')->name('general.setting.update');

        // SMTP Setting Routes
        Route::get('/settings/smtp-setting', 'smtpSetting')->name('smtp.setting');
        Route::put('/settings/smtp-setting-update', 'updateSmtpSetting')->name('smtp.setting.update');

        // Role Permission Routes
        Route::get('/settings/roles', 'rolesIndex')->name('roles.index');
        Route::get('/settings/roles/create', 'roleCreate')->name('roles.create');
        Route::post('/settings/roles', 'roleStore')->name('roles.store');
        Route::get('/settings/roles/{id}/edit', 'roleEdit')->name('roles.edit');
        Route::put('/settings/roles/{id}', 'roleUpdate')->name('roles.update');
        Route::delete('/settings/roles/{id}', 'roleDestroy')->name('roles.destroy');
        Route::delete('/settings/roles-destroybyselection', 'roleDestroyBySelection')->name('roles.destroybyselection');

        // Currency Routes
        Route::get('/settings/currencies', 'currencyIndex')->name('currencies.index');
        Route::get('/settings/currencies/create', 'currencyCreate')->name('currencies.create');
        Route::post('/settings/currencies', 'currencyStore')->name('currencies.store');
        Route::get('/settings/currencies/{id}/edit', 'currencyEdit')->name('currencies.edit');
        Route::put('/settings/currencies/{id}', 'currencyUpdate')->name('currencies.update');
        Route::put('/settings/currencies/toggle-status/{id}', 'toggleCurrencyStatus')->name('currencies.toggle.status');
        Route::delete('/settings/currencies/{id}', 'currencyDestroy')->name('currencies.destroy');
        Route::delete('/settings/currencies-destroybyselection', 'currencyDestroyBySelection')->name('currencies.destroybyselection');

        // Stripe Credentials Route
        Route::put('/settings/stripe-credentials-save', 'stripeCredentialsSave')->name('stripe.credentials.save');

        // Cloudinary Credentials Route
        Route::put('/settings/cloudinary-credentials-save', 'cloudinaryCredentialsSave')->name('cloudinary.credentials.save');
    });
});

require __DIR__.'/auth.php';
