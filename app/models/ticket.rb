class Ticket < ActiveRecord::Base
  validates :user_id, :subject, :text, presence: true
  belongs_to :user
end
