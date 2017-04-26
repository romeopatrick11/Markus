class MarkingScheme < ApplicationRecord
  has_many :marking_weights, dependent: :destroy
  accepts_nested_attributes_for :marking_weights
end
