Feature: Lift

  @wip
  Scenario: Package
    When the project is lifted
    Then the npm badge is defined for the registry
