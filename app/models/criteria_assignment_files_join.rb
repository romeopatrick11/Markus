class CriteriaAssignmentFilesJoin < ApplicationRecord
  belongs_to :criterion, polymorphic: true
  belongs_to :assignment_file
  accepts_nested_attributes_for :assignment_file, :criterion

  has_one :template_division

  def build_criterion(params)
    params[:type] ||= 'FlexibleCriterion'
    params[:max_mark] ||= 1
    self.criterion = params[:type].constantize.new(params.except(:type))
  end
end
