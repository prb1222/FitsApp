class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.integer :user_id, null: false
      t.text :text, null: false
      t.string :subject, null: false
      
      t.timestamps null: false
    end
  end
end
