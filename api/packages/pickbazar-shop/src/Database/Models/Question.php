<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Question extends Model
{
    use SoftDeletes;

    protected $table = 'questions';

    public $guarded = [];

    protected $appends = [
        'positive_feedbacks_count',
        'negative_feedbacks_count',
        'my_feedback',
        'abusive_reports_count'
    ];

    /**
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->BelongsTo(Product::class, 'product_id');
    }

  

    /**
     * @return belongsTo
     */
    public function user(): belongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get all of the questions feedbacks.
     */
    public function feedbacks()
    {
        return $this->morphMany(Feedback::class, 'model');
    }

    /**
     * Get all of the questions abusive reports.
     */
    public function abusive_reports()
    {
        return $this->morphOne(AbusiveReport::class, 'model');
    }

    /**
     * Positive feedback count of question.
     * @return int
     */
    public function getPositiveFeedbacksCountAttribute()
    {
        return $this->feedbacks()->wherePositive(1)->count();
    }

    /**
     * Negative feedback count of question.
     * @return int
     */
    public function getNegativeFeedbacksCountAttribute()
    {
        return $this->feedbacks()->whereNegative(1)->count();
    }

    /**
     * Get authenticated user feedback
     * @return object | null
     */
    public function getMyFeedbackAttribute()
    {
        if (auth()->user()) {
            return $this->feedbacks()->where('user_id', auth()->user()->id)->first();
        }
        return null;
    }

    /**
     * Count no of abusive reports in the question.
     * @return int
     */
    public function getAbusiveReportsCountAttribute()
    {
        return $this->abusive_reports()->count();
    }
}
